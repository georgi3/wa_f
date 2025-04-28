// Retrieved from https://www.freemaptools.com/find-canada-postcodes-inside-radius.htm
// TODO: Get this data from a real API endpoint that calculates it from the initial point of service for the event
const postalCodeServiceAreaMap = {
    'H1T': true,'J1S': true,'H3G': true,'H8N': true,'H2W': true,'H1N': true,
    'H2E': true,'J4K': true,'J7R': true,'J4H': true,'J3V': true,'H2Y': true,
    'H8R': true,'J4P': true,'H2S': true,'H3Z': true,'H4G': true,'H1W': true,
    'J3R': true,'J4R': true,'H1V': true,'H1E': true,'H4C': true,'H2N': true,
    'H4E': true,'J5N': true,'H2T': true,'H3W': true,'G3N': true,'H4B': true,
    'H2H': true,'H3E': true,'H3Y': true,'H1X': true,'H3A': true,'H2J': true,
    'H3N': true,'H2G': true,'H3T': true,'H2Z': true,'H2X': true,'H7C': true,
    'H2R': true,'H5A': true,'H4A': true,'J5R': true,'H1R': true,'H3K': true,
    'H1A': true,'H3C': true,'J4J': true,'H1B': true,'H3X': true,'H3P': true,
    'J4V': true,'J4N': true,'H4L': true,'H1Y': true,'J4B': true,'H3B': true,
    'H2L': true,'H4P': true,'J4S': true,'H3V': true,'H3J': true,'J4T': true,
    'H3S': true,'H1P': true,'J5A': true,'G7H': true,'H2K': true,'H3H': true,
    'H2A': true,'H2V': true,'H3R': true,'H4H': true,'G8B': true, 'H5B': true
};

export const MAX_DISTANCE_KM = 6; // Simply an approximation

export const isWithinServiceArea = (postalCode) => {
  if (!postalCode || typeof postalCode !== 'string') return false;
  const prefix = postalCode.substring(0, 3).toUpperCase();
  return postalCodeServiceAreaMap[prefix] === true;
};

export const getServiceAreaMessage = () => {
  return `We currently serve areas within approximately ${MAX_DISTANCE_KM}km of Berri-UQAM.`;
};
