import React from 'react';
import { css } from 'glamor';

import EmptyContent from 'components/EmptyContent';
import ContentTable from './ContentTable';
import EditingContentTable from './EditingContentTable';
import { compose } from 'recompose';
import { provideThing } from 'stateProviders';
import { injectState } from 'freactal';

const styles = {
  container: {
    padding: 60,
    minWidth: 500,
    boxShadow: '-2px 0 12px 0 rgba(0,0,0,0.1)',
    position: 'relative',
  },
};

const INITIAL_STATE = { entity: null, editing: false, saving: false };

const enhance = compose(provideThing, injectState);

class Content extends React.Component<any, any> {
  state = INITIAL_STATE;

  fetchData = async ({ id, effects: { setItem }, type }) => {
    await setItem(id, type);
    this.setState({ ...INITIAL_STATE });
  };

  componentDidMount() {
    this.fetchData(this.props);
  }

  componentWillReceiveProps(nextProps: any) {
    const { id } = nextProps;
    if (id !== this.props.id) {
      this.fetchData(nextProps);
    }
  }

  render() {
    const {
      rows,
      styles: stylesProp = {},
      id,
      emptyMessage,
      effects: { saveChanges },
      state: { item },
    } = this.props;

    return (
      <div className={`Content ${css(styles.container, stylesProp)}`}>
        <button
          onClick={async () => {
            if (this.state.editing) {
              this.setState({ saving: true });
              await saveChanges();
              this.setState({ saving: false, editing: false, updates: null });
            } else {
              this.setState({ editing: true });
            }
          }}
        >
          {this.state.editing ? 'save' : 'edit'}
        </button>
        {this.state.editing && (
          <button onClick={() => this.setState({ editing: false, updates: null })}>cancel</button>
        )}

        {!id ? (
          <EmptyContent message={emptyMessage} />
        ) : !item ? (
          <EmptyContent message={'loading'} />
        ) : this.state.editing ? (
          <EditingContentTable rows={rows} />
        ) : (
          <ContentTable rows={rows} />
        )}
      </div>
    );
  }
}

export default enhance(Content);
