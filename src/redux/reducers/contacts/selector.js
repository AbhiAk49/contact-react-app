// selectors are used to fetch state properties (ideally each reducer must have its own set of selectors)

export const getContactsState = (state) => {
  const { contacts } = state;
  return contacts;
};

export const getContactsFromState = (state) => {
  const { contacts } = state;
  return contacts.contacts;
};
