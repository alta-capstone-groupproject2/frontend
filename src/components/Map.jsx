import { MapContainer, Marker, TileLayer } from 'react-leaflet';
const Map = ({ position, children }) => {
	return (
		<MapContainer center={position} zoom={13} scrollWheelZoom={true} style={{ height: 300, width: '100%' }}>
			<TileLayer attribution='' url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
			{/* <Markers /> */}
			{!children ? <Marker position={position}></Marker>:children}
		</MapContainer>
	);
};
export default Map;
