const NewPrendaStyles = theme => ({
  container: {
    // display: 'flex',
    // flexWrap: 'wrap',
    // margin: '40px auto',
    // Width: '88.5%',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0px 4px 10px 2px #00000033, 0px 4px 10px 2px #00000024, 0px 4px 10px 2px #0000001f',

  },
  button: {
    margin: theme.spacing.unit,
  },
  fabSearch: {
    width: 35,
    height: 35,
    '&:hover': {
      backgroundColor: '#0060C7',
    },
    backgroundColor: '#0075F2',
    color: 'white'
  },
  saveButton: {
    '&:hover': {
      backgroundColor: '#0060C7',
    },
    margin: theme.spacing.unit,
    backgroundColor: '#0075F2',
    color: 'white'
  },
  cancelButton: {
    '&:hover': {
      backgroundColor: '#B80516',
    },
    margin: theme.spacing.unit,
    backgroundColor: '#E21B2E',
    color: 'white'
  },
  textField: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 6,
    marginBottom: 6,
    maxWidth: 180,


  },
  itemField: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 6,
    marginBottom: 6,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  leftIcon: {
    marginRight: 6,
  },
  iconSmall: {
    fontSize: 20,
  },
  IconMargin: {
    marginTop: 8,
  },
  tableHead: {
    fontSize: 12,
    backgroundColor: '#000000c2',
    color: 'white',

  },
  tableRow: {
    '&:hover': {
      backgroundColor: '#007bff61',
    },
    fontSize: '11px',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
});

const CustomerStyles = theme => ({
  container: {
    width: '60%',
    margin: '40px auto',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0px 4px 10px 2px #00000033, 0px 4px 10px 2px #00000024, 0px 4px 10px 2px #0000001f',
  },
  searchButton: {
    '&:hover': {
      backgroundColor: '#0060C7',
    },
    margin: theme.spacing.unit,
    backgroundColor: '#0075F2',
    color: 'white'
  },
  addButton: {
    '&:hover': {
      backgroundColor: '#B80516',
    },
    margin: theme.spacing.unit,
    backgroundColor: '#E21B2E',
    color: 'white'
  },
  pageButton: {
    margin: theme.spacing.unit,
    // backgroundColor: '#28a745',
    // color: 'white'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: 8,
    maxWidth: 180,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  leftIcon: {
    marginRight: 5,
  },
  iconSmall: {
    fontSize: 15,
  },
  margin: {
    marginTop: 15,
  },
  tableHead: {
    fontSize: 12,
    backgroundColor: '#000000c2',
    color: 'white',

  },
  tableRow: {
    '&:hover': {
      backgroundColor: '#007bff61',
    },
    fontSize: '11px',
    fontWeight: 'bold',
    cursor: 'pointer'
  }
});

const InputProps = {
  style: {
    height: 30,
    marginTop: 3,

  }
}

const ReadOnlyInputProps = {
  readOnly: true,
  style: {
    height: 30,
    marginTop: 3

  }
}

export {
  NewPrendaStyles,
  CustomerStyles,
  InputProps,
  ReadOnlyInputProps
};