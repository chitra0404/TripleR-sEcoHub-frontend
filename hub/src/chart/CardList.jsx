import React from 'react';
import { Card } from './Card';

export function CardList() {
    const cardData = [
        {
            title: "Pickups",
            count: 150,
            colors: "success",
        },
        {
            title: "Consumers",
            count: 130,
            colors: "warning",
        },
        {
            title: "Recyclers",
            count: 350,
            colors: "info",
        },
        {
            title: "Query",
            count: 158,
            colors: "primary",
        }
    ];

    return (
        <div className='row'>
            {cardData.map((dt, index) => (
                <Card key={index} data={dt} />
            ))}
        </div>
    );
}
