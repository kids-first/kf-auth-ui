import _ from 'lodash';
import React from 'react';
import { css } from 'glamor';
import withSize from 'react-sizeme';
import { compose, withPropsOnChange, defaultProps, withProps, withState } from 'recompose';

import colors from 'common/colors';
import Pagination from 'components/Pagination';
import styles from './ListPane.styles';
import { Dropdown, Button, Input } from 'semantic-ui-react';

interface IListProps {
  onSelect: Function;
  Component: any;
  getKey: Function;
  getData: Function;
  size: any;
  pageSize: number;
  styles: any;
  selectedItem: any;
  sortableFields: {
    key: string;
    value: string;
  }[];
  initialSortField;
  sortOrder: 'ASC' | 'DESC';
  setSortOrder;
  initialSortOrder: 'ASC' | 'DESC';
  sortField;
  setSortField;
  query;
  setQuery;
}

interface IListState {
  items: any[];
  count: number;
  offset: number;
}

const enhance = compose(
  defaultProps({
    columnWidth: 200,
    rowHeight: 60,
    getKey: item => item.id,
    onSelect: _.noop,
  }),
  withState('query', 'setQuery', props => props.initialQuery || ''),
  withState('sortField', 'setSortField', props => props.initialSortField),
  withState('sortOrder', 'setSortOrder', props => props.initialSortOrder),
  withSize({
    refreshRate: 20,
    monitorHeight: true,
  }),
  withProps(({ columnWidth, rowHeight, styles: stylesProp }) => ({
    styles: _.merge(styles({ columnWidth, rowHeight }), [stylesProp]),
  })),
  withPropsOnChange(
    (props, nextProps) =>
      (props.size.width !== nextProps.size.width || props.size.height !== nextProps.size.height) &&
      nextProps.size.width !== 0,
    ({ size, columnWidth, rowHeight }) => {
      // TODO: move this HOC into the element that only renders the list, no extra elements to account for
      const extraVerticalSpace = 60 + 76 + 10;
      const extraHorizontalSpace = 20;
      const columns = Math.max(Math.floor((size.width - extraHorizontalSpace) / columnWidth), 1);
      const rows = Math.max(Math.floor((size.height - extraVerticalSpace) / rowHeight), 1);
      const pageSize = columns * rows;
      return {
        pageSize,
      };
    },
  ),
);

const paneControls = {
  container: {
    backgroundColor: 'rgba(144, 144, 144, 0.05)',
    borderBottom: '1px solid #eaeaea',
    padding: '0 0',
    display: 'flex',
    minHeight: 80,
  },
  sortContainer: {
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
  },
  searchContainer: {
    marginLeft: 10,
    marginRight: 'auto',
    display: 'flex',
    alignItems: 'center',
  },
  sortOrderWrapper: {
    marginLeft: '10px',
    marginRight: '10px',
  },
};

class List extends React.Component<IListProps, IListState> {
  state = {
    items: [],
    count: 0,
    offset: 0,
  };

  fetchData = async ({ offset }) => {
    const { getData, pageSize, sortField, sortOrder, query } = this.props;
    const { resultSet, count = 0 } = await getData({
      offset,
      limit: pageSize,
      sortField: sortField.key,
      sortOrder: sortOrder,
      query,
    });
    this.setState({ items: resultSet, count });
  };

  componentDidMount() {
    this.fetchData({ offset: 0 });
  }

  componentDidUpdate(prevProps: IListProps, prevState: IListState) {
    if (
      prevProps.pageSize !== this.props.pageSize ||
      prevProps.getData !== this.props.getData ||
      prevProps.sortField.key !== this.props.sortField.key ||
      prevProps.sortOrder !== this.props.sortOrder ||
      prevProps.query !== this.props.query
    ) {
      console.log(this.props.query);
      this.fetchData({ offset: 0 });
    } else if (prevState.offset !== this.state.offset) {
      this.fetchData({ offset: this.state.offset });
    }
  }

  render() {
    const {
      onSelect,
      Component,
      getKey,
      pageSize,
      styles,
      selectedItem,
      sortableFields,
      sortField,
      setSortField,
      sortOrder,
      setSortOrder,
      query,
      setQuery,
    } = this.props;
    const { items, count, offset } = this.state;

    const fillersRequired = pageSize - items.length;

    return (
      <div className={`List ${css(styles.container)}`}>
        <div className={`pane-controls ${css(paneControls.container)}`}>
          <div className={`search-container ${css(paneControls.searchContainer)}`}>
            <Input placeholder="Search..." onChange={(event, { value }) => setQuery(value)} />
          </div>
          <div className={`sort-container ${css(paneControls.sortContainer)}`}>
            Sort by:
            <Dropdown
              selection
              style={{ minWidth: '10em', marginLeft: '0.5em' }}
              selectOnNavigation={false}
              options={sortableFields.map(field => ({ text: field.value, value: field.key }))}
              text={sortField.value}
              onChange={(event, { value }) =>
                setSortField(sortableFields.find(field => field.key === value))}
            />
            <Button.Group className={`${css(paneControls.sortOrderWrapper)}`} vertical>
              <Button
                style={Object.assign(
                  { paddingBottom: 0, backgroundColor: 'transparent' },
                  sortOrder === 'ASC' && { color: colors.purple },
                )}
                onClick={() => setSortOrder('ASC')}
                icon="chevron up"
              />
              <Button
                style={Object.assign(
                  { paddingTop: 0, backgroundColor: 'transparent' },
                  sortOrder === 'DESC' && { color: colors.purple },
                )}
                onClick={() => setSortOrder('DESC')}
                icon="chevron down"
              />
            </Button.Group>
          </div>
        </div>
        <div className={`items-wrapper`}>
          {items.map(item => (
            <Component
              sortField={sortField.key}
              className={selectedItem && getKey(item) === getKey(selectedItem) ? 'selected' : ''}
              item={item}
              style={styles.listItem}
              key={getKey(item)}
              onClick={() => onSelect(item)}
              selected={selectedItem && getKey(item) === getKey(selectedItem)}
            />
          ))}
          {_.range(fillersRequired).map(i => (
            <div key={i + offset} className={`filler ${css(styles.filler)}`} />
          ))}
        </div>
        {(pageSize < count || offset > 0) && (
          <Pagination
            onChange={page => this.setState({ offset: page * pageSize })}
            offset={offset}
            limit={pageSize}
            total={count}
            range={3}
          />
        )}
      </div>
    );
  }
}

export default enhance(List);
