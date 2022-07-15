/** @format */

import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import '../../node_modules/leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';
const Map = ({ position }) => {
	return (
		<MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: 300, width: '100%' }}>
			<TileLayer attribution='' url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
			<Marker position={position} />
		</MapContainer>
	);
};
export default Map;
