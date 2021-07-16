import React, { useState } from 'react';
import styles from './ModelCardView.module.scss';
import ModelCard from './components/ModelCard/ModelCard';
import FilterBar from './components/FilterBar/FilterBar';
import { mockData } from '../../services/mockData';


export default function ModelCardView(props) {
    const [filteredCards, setFilteredCards] = useState(mockData);

    const renderCards = () => {
        console.log(filteredCards)
        return filteredCards.map((card) => (
            <ModelCard
                title={card.id.replace('alwaysai/', '')}
                purpose={card.model_parameters.purpose}
                description={card.description}
                labels={card.labels ? card.labels.labels : null}
                framework={card.model_parameters.framework_type}
                dataSet={card.dataset ? card.dataset : 'Unknown'}
                key={card.id}
                version={card.version}
                inference_time={card.benchmark && card.benchmark['jetson-nano'] ? (card.benchmark['jetson-nano']['DNN_CUDA:NVIDIA'] * 100).toFixed(2) : null}
                size={Math.round(card.size / 1024 / 1000)}
            />
        ))

    }

    const filterCards = (framework) => {
        if (framework) {
            setFilteredCards(filteredCards.filter(card => card.model_parameters.framework_type === framework))
        } else {
            setFilteredCards(mockData)
        }
    }

    return (
        <div className={styles['main-wrapper']}>
            <div className={styles['filter-bar-section']}>
                <FilterBar filterCards={filterCards} />
            </div>
            <div className={styles['cards-section']}>
                {renderCards()}
            </div>
        </div>
    )
}

