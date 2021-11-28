const getTimeAMPMFormat = (hour: number): string => {
  let hours: string | number = hour % 12;
  hours = hours ? hours : 12;
  const ampm = hour >= 12 ? "PM" : "AM";
  return `${hours} ${ampm}`;
};

const getToday = (localtime?: string) =>
  localtime ? new Date(localtime).toDateString() : "";

export default { getTimeAMPMFormat, getToday };
