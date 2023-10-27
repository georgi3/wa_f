import React from "react";
import {scaleOrdinal} from "d3-scale";
import {schemeCategory10} from "d3-scale-chromatic";
import WordCloud from "react-d3-cloud";

const schemeCategory10ScaleOrdinal = scaleOrdinal(schemeCategory10);
const fontSizeMapper = word => Math.log2(word.value) * 5;
const words = [
    { text: 'Community', value: 100},
    {text: 'Student-involvement', value: 100},
    {text: 'Equality', value: 100},
    {text: 'Volunteerism Avenue', value: 100},
    {text: 'Inclusion', value: 100},
    {text: 'Education', value: 100},
    {text: 'Sustainability', value: 100},
    {text: 'Giving', value: 100},
    { text: 'Empathy', value: 100},
    {text: 'Solidarity', value: 100},
    {text: 'Involvement', value: 100},
    {text: 'Diversity', value: 100},
    {text: 'Partnership', value: 100},
    {text: 'Learning', value: 100},
    {text: 'Awareness', value: 100},
    {text: 'Self-growth', value: 100},
    {text: 'Support', value: 100},
    { text: 'Leadership', value: 100},
    {text: 'Student-run', value: 100},
    {text: 'Respect', value: 100},
    {text: 'Social Justice', value: 100},
    {text: 'Philanthropy', value: 100},
    {text: 'WelfareAvenue', value: 350},
    {text: 'Compassion', value: 100},
    {text: 'Empowerment', value: 100},
    {text: 'Contribution', value: 100},
];

const SimpleCloud = () => (
    <WordCloud
        data={words}
        fontSizeMapper={fontSizeMapper}
        width={400}
        height={100}
        rotate={0}
        padding={3}
        fill={(d, i) => schemeCategory10ScaleOrdinal(i)}
    />
)

export default SimpleCloud;