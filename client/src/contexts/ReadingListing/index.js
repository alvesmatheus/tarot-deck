import { createContext } from 'react';

export const ReadingListingContext = createContext({
    readings: [],
    totalReadings: 0,
    displayedReadings: 5,
    increaseDisplayedReadings: () => {},
});

export default ReadingListingContext;
