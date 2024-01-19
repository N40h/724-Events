import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import Field, { FIELD_TYPES } from '../../components/Field';
import Select from '../../components/Select';
import Button, { BUTTON_TYPES } from '../../components/Button';

const mockContactApi = () =>
	new Promise((resolve) => {
		setTimeout(resolve, 1000);
	});

const Form = ({ onSuccess, onError }) => {
	const [sending, setSending] = useState(false);
	const sendContact = useCallback(
		async (evt) => {
			evt.preventDefault();

			// Form validation
			const form = evt.target;
			const fields = form.querySelectorAll('input[name], textarea[name]');
			const selectionField = form.querySelector('.Select');
			const selectionValue = fields[2].value;
			let isFormValid = true;

			fields.forEach((field) => {
				if (!field.value) {
					isFormValid = false;
					field.classList.add('error');
				} else {
					field.classList.remove('error');
				}
			});

			if (!selectionValue) {
				selectionField.classList.add('error');
			} else {
				selectionField.classList.remove('error');
			}

			if (!isFormValid) {
				return;
			}

			setSending(true);
			// We try to call mockContactApi
			try {
				await mockContactApi();
				setSending(false);
				onSuccess(); // Added onSuccess prop
			} catch (err) {
				setSending(false);
				onError(err);
			}
		},
		[onSuccess, onError]
	);
	return (
		<form onSubmit={sendContact}>
			<div className="row">
				<div className="col">
					<Field placeholder="" label="Nom" />
					<Field placeholder="" label="Prénom" />
					<Select
						selection={['Personel', 'Entreprise']}
						onChange={() => null}
						label="Personel / Entreprise"
						type="large"
						titleEmpty
					/>
					<Field placeholder="" label="Email" />
					<Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
						{sending ? 'En cours' : 'Envoyer'}
					</Button>
				</div>
				<div className="col">
					<Field
						placeholder="message"
						label="Message"
						type={FIELD_TYPES.TEXTAREA}
					/>
				</div>
			</div>
		</form>
	);
};

Form.propTypes = {
	onError: PropTypes.func,
	onSuccess: PropTypes.func,
};

Form.defaultProps = {
	onError: () => null,
	onSuccess: () => null,
};

export default Form;
