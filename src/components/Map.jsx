import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';
const Map = ({ position, children }) => {
	return (
		<MapContainer center={position} zoom={13} scrollWheelZoom={true} style={{ height: 300, width: '100%' }}>
			<TileLayer attribution='' url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
			{/* <Markers /> */}
			{children}
		</MapContainer>
	);
};
export default Map;