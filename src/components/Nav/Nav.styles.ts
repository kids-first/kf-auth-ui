import colors from 'common/colors';

const styles = {
  container: {
    position: 'relative',
    backgroundColor: colors.purple,
    color: '#fff',
    width: 240,
    padding: '0 0 30px',
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
    zIndex: 100,
    transition: 'width 0.5s cubic-bezier(0.19, 1, 0.22, 1)',
    '&.collapsed': {
      width: 50,
    },
  },

  emblem: {
    margin: '60px auto 0',
    '.collapsed &': {
      margin: '30px auto 0',
    },
    '& img': {
      display: 'block',
      width: '60%',
      margin: 'auto',
      '&.small': {
        height: 0,
        visibility: 'hidden',
      },
      '.collapsed &': {
        '&.small': {
          height: 'auto',
          visibility: 'visible',
        },
        '&.regular': {
          height: 0,
          visibility: 'hidden',
        },
      },
    },
  },

  linkList: {
    flexGrow: 1,
    fontSize: 22,
    fontWeight: 'lighter',
    lineHeight: '35px',
  },

  link: {
    color: '#fff',
    position: 'relative',
    display: 'flex',
    width: '100%',
    padding: 4,
    '& div': {
      width: '60%',
      margin: 'auto',
      position: 'relative',
      zIndex: 2,
      display: 'flex',
    },
    '& i': {
      flex: 'none',
    },
    '&::before': {
      display: 'block',
      position: 'absolute',
      zIndex: 1,
      backgroundColor: '#6a0e65',
      content: '""',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      padding: '0.5em 0.5em',
      transition: 'opacity 0.15s, transform 0.2s 0.15s, box-shadow 0.2s 0.15s',
      transform: 'scaleX(1) scaleY(1)',
      boxShadow: '-3px 0px 1px 1px rgba(0, 0, 0, 0.1)',
      opacity: 0,
    },
    '&:hover': {
      color: '#fff',
      backgroundColor: '#771872',
    },
    '&.active': {
      '& div': {
        textShadow: '-3px 2px 2px rgba(0,0,0,0.2)',
      },
      '&::before': {
        transform: 'scaleX(1.03) scaleY(1.05)',
        boxShadow: '-3px 3px 1px 1px rgba(0, 0, 0, 0.1)',
        opacity: 1,
      },
    },
    '& .text': {
      transition: 'opacity 0.25s cubic-bezier(0.19, 1, 0.22, 1)',
      '.collapsed &': {
        opacity: 0,
      },
    },
  },
  logout: {
    textAlign: 'left',
    fontSize: 22,
    fontWeight: 'lighter',
    padding: '0 50px',
  },
};

export default styles;
