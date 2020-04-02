import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

import { UPDATE_JOKE, UPDATE_POLLING_STATS, POLL_START, POLL_STOP } from "./types";
 
export const updateJoke = joke => ({
    type: 'UPDATE_JOKE',
    joke
});

export const updatePollingStats = stats => ({
    type: 'UPDATE_POLLING_STATS',
    stats
});

export const startPolling = params => ({
    type: 'POLL_START',
    params
});

export const stopPolling = () => ({
    type: 'POLL_STOP'
});

