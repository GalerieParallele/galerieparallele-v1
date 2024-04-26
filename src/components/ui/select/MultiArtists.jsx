import useArtistsStore from "@/stores/artistsStore";
import {useEffect, useMemo, useState} from "react";
import Select from "react-select";

export default function MultiArtists({onChange, defaultArtistsSelected = [], blockedArtists = []}) {

    const {artists, loading, error, reloadArtists} = useArtistsStore();
    const [selectedValues, setSelectedValues] = useState([]);
    const [newArtists, setNewArtists] = useState([]);

    const options = useMemo(() => {
        const combinedArtists = artists ? [...artists, ...newArtists] : newArtists;
        return combinedArtists.map(artist => ({
            value: artist.id,
            label: artist.pseudo ? artist.pseudo : artist.user.firstname + ' ' + artist.user.lastname,
            isDisabled: blockedArtists.includes(artist.id),
        }));
    }, [artists, blockedArtists, newArtists]);

    const handleChange = (selectedOptions) => {
        const newValues = selectedOptions.map(option => option.value);
        setSelectedValues(newValues);
        onChange(newValues);

        // Traiter les nouveaux tags
        const newlyAddedArtists = selectedOptions
            .filter(option => option.__isNew__)
            .map(option => ({name: option.value}));

        if (newlyAddedArtists.length > 0) {
            setNewArtists(prevNewArtists => [...prevNewArtists, ...newlyAddedArtists]);
        }
    };

    useEffect(() => {
        reloadArtists();
        console.log(artists);
        setSelectedValues(defaultArtistsSelected);
    }, []);

    const selectedOptions = options && options.filter(option => selectedValues.includes(option.value));

    return (
        <div style={{marginBottom: '150px'}}>
            <Select
                placeholder="Sélectionner un ou plusieurs artistes"
                closeMenuOnSelect={false}
                isMulti
                options={options}
                noOptionsMessage={() => "Aucun artiste trouvé"}
                onChange={handleChange}
                value={selectedOptions}
                isLoading={loading || error}
                isOptionDisabled={(option) => option.isDisabled}
            />
        </div>
    );
}

