import React, { FormEvent, useState } from 'react'
import { BreedData, GameSettingsByUser } from '../../models/models';
import styles from './ChoiceSelector.module.css';


interface ChoiceSelectorProps {
    breeds: BreedData[],
    manageDataSettings: (data: GameSettingsByUser) => void
}

export function ChoiceSelector({ breeds, manageDataSettings }: ChoiceSelectorProps) {

    const [form, setForm] = useState({
        duration: 0,
        breed: breeds[0].id
    });

    const handleChange = (event: FormEvent<HTMLElement>) => {
        const target = event.target as HTMLInputElement | HTMLSelectElement;
        setForm((prev) => ({ ...prev, [target.name]: target?.value }));
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        const { duration, breed } = form;
        const settings: GameSettingsByUser = { duration, breed };
        manageDataSettings(settings);
    };

    return (
        <>
            <form onSubmit={handleSubmit} >
                <div className={styles.row}>
                    <label htmlFor="duration">Timer (s):</label>
                    <input
                        type="number"
                        name="duration"
                        placeholder="Duration"
                        min={0}
                        value={form.duration}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>
                <div className={styles.row}>
                    <label htmlFor="breed">Breed: </label>
                    <select name='breed' onChange={handleChange} value={form.breed} className={styles.input}>
                        {breeds.map((breed) => (
                            <option value={breed.id} key={breed.id}>{breed.name}</option>
                        ))}
                    </select>
                </div>

                <div className={styles.action}>
                    <button>Find kitties</button>
                </div>
            </form>
        </>
    )
}
