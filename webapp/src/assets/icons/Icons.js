import React from 'react';

export const Dashboard = ({color}) => (
    <svg class="icon"
         viewBox="0 0 1024 1024"
         width="22"
         fill={color}
         height="22">
        <path
            d="M553.984 128l342.016 0 0 256-342.016 0 0-256zM553.984 896l0-425.984 342.016 0 0 425.984-342.016 0zM128 896l0-256 342.016 0 0 256-342.016 0zM128 553.984l0-425.984 342.016 0 0 425.984-342.016 0z"
        />
    </svg>
)

export const Calendar = props => (
    <svg viewBox="64 64 896 896" focusable="false" className="" data-icon="calendar" width="1em" height="1em"
         fill="currentColor" aria-hidden="true" x='50%' y='50%'>
        <path
            d="M880 184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H144c-17.7 0-32 14.3-32 32v664c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V216c0-17.7-14.3-32-32-32zm-40 656H184V460h656v380zM184 392V256h128v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h256v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h128v136H184z"></path>
    </svg>
)