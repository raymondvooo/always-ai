import React from 'react';

export default function CircleSvg(props) {
    return (
        <svg height="106" width="106">
        <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#70efdb"></stop>
        <stop offset="100%" stop-color="#20ac97"></stop></linearGradient>
        <circle stroke="url(#gradient)" stroke-dasharray="282.7433388230814 282.7433388230814" stroke-width="4" fill="transparent" r="45" cx="53" cy="53" style={{strokeDashoffset: props.degree}}>
        </circle></svg>
    )
}