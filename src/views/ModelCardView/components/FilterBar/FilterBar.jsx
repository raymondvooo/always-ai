import React, { useState } from 'react';
import styles from './FilterBar.module.scss';
import { Accordion, AccordionSummary, Typography, FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { getFrameworks } from '../../../../services/mockData';

export default function FilterBar(props) {
    const [selectedFramework, setSelectedFramework] = useState('');

    const renderFormOptions = () => {
        let options = [];
        const frameworks = getFrameworks();
        for (const key in frameworks) {
            if (selectedFramework === '' || selectedFramework === key) {
                options.push(
                    <FormControlLabel
                        control={
                            <Checkbox
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setSelectedFramework(key)
                                        props.filterCards(key);
                                    } else {
                                        setSelectedFramework('')
                                        props.filterCards()
                                    }
                                }}
                                checked={selectedFramework === key}
                            />
                        }
                        label={`${key} ${frameworks[key]}`}
                        key={key}
                    />
                )
            }

        }
        return options
    }


    return (
        <div className={styles['wrapper']}>
            <div className={`${styles['top-bar']} row mt-5 mb-4 `}>
                <div className='col'>Refine by</div>
                <div className='col text-right'>
                    <button onClick={() => {
                        setSelectedFramework('');
                        props.filterCards()
                    }
                    }>
                        Clear Filters
                    </button></div>
            </div>
            <div className={styles['section']}>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Frameworks</Typography>
                    </AccordionSummary>
                    <FormGroup>
                        {renderFormOptions()}
                    </FormGroup>
                </Accordion>
            </div>
        </div>
    )
}

