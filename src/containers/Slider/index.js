import React, { useEffect, useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { getMonth } from '../../helpers/Date';

import './style.scss';

const Slider = () => {
	const { data } = useData();
	const [index, setIndex] = useState(0);
	const byDateDesc = data?.focus.sort((evtA, evtB) =>
		new Date(evtA.date) < new Date(evtB.date) ? 1 : -1
	);
	const nextCard = () => {
		if (byDateDesc !== undefined) {
			setTimeout(
				() => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0), // index < byDateDesc.length - 1, if the index is at the last position it will reset to 0
				5000
			);
		}
	};
	useEffect(() => {
		nextCard();
	});

	return (
		<div className="SlideCardList">
			{byDateDesc?.map((event, idx) => (
				<React.Fragment key={event.title}>
					<div
						className={`SlideCard SlideCard--${
							index === idx ? 'display' : 'hide'
						}`}
					>
						<img src={event.cover} alt="forum" />
						<div className="SlideCard__descriptionContainer">
							<div className="SlideCard__description">
								<h3>{event.title}</h3>
								<p>{event.description}</p>
								<div>{getMonth(new Date(event.date))}</div>
							</div>
						</div>
					</div>
					<div className="SlideCard__paginationContainer">
						<div className="SlideCard__pagination">
							{byDateDesc.map((_, radioIdx) => (
								<input
									key={`${_.title}`}
									type="radio"
									name="radio-button"
									checked={index === radioIdx} // use index state to sync the dots with the slider's display
									readOnly
								/>
							))}
						</div>
					</div>
				</React.Fragment>
			))}
		</div>
	);
};

export default Slider;
