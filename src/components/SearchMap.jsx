import { useEffect } from "react";
import { useMap } from "react-leaflet";
import '../../node_modules/leaflet-geosearch/dist/geosearch.css';
import { GeoSearchControl,OpenStreetMapProvider } from "leaflet-geosearch";

const SearchControl = props => {
    const map = useMap();
    const {setPosition} = props
        
    const searchControl = new GeoSearchControl({
        provider: new OpenStreetMapProvider(),
        style: 'bar',
        maxMarkers: 1,
        notFoundMessage: 'Sorry, that address could not be found.',
        searchLabel: 'Input address event here'
    });

    useEffect(() => {
        map.on('geosearch/showlocation', (result) => {
            setPosition([result.location.y, result.location.x])
        });
        map.addControl(searchControl);
        return () => map.removeControl(searchControl);
    }, []);
    
  return null;
};
export default SearchControl;