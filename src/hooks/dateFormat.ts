export const dateOptions: Intl.DateTimeFormatOptions = {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  hour12: true
};

export const formatDate = (date: Date) => new Intl.DateTimeFormat('en-US', dateOptions).format(date);