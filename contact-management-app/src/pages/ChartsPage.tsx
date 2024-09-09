import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
} from 'react-leaflet';
import L from 'leaflet';
import { useQuery } from '@tanstack/react-query';
import 'leaflet/dist/leaflet.css';
import { LatLngExpression } from 'leaflet';
import { fetchCountryCases, fetchGraphData } from '../services/api';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Interface for graph data
interface GraphData {
    cases: { [key: string]: number };
    deaths: { [key: string]: number };
    recovered: { [key: string]: number };
}

// Interface for country-specific data
interface CountryData {
    country: string;
    countryInfo: { lat: number; long: number };
    active: number;
    recovered: number;
    deaths: number;
}

// Fix the marker icon issue
const markerIcon = new L.Icon({
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

const ChartsPage = () => {
    // Fetch graph data for cases, deaths, and recovered stats
    const { data: graphData, isLoading: graphLoading, error: graphError } = useQuery<GraphData>({
        queryKey: ['graphData'],
        queryFn: fetchGraphData,
    });

    // Fetch country-specific data for markers
    const { data: countriesData, isLoading: countryLoading, error: countryError } = useQuery<CountryData[]>({
        queryKey: ['countryCases'],
        queryFn: fetchCountryCases,
    });

    const center: LatLngExpression = [51.505, -0.09]; // Center of the map

    if (graphLoading || countryLoading) return <div>Loading...</div>;
    if (graphError || countryError) return <div>Error occurred</div>;

    return (
        <div className="flex flex-col items-center justify-center space-y-8 px-4 py-6 " >
            {/* Chart and Map Container */}
            <div className="container mx-auto flex flex-col lg:flex-row items-start justify-between space-y-8 lg:space-y-0 lg:space-x-8 main-div">

                {/* Line Graph for case fluctuations */}
                <div className="bg-white shadow-md p-6 rounded-lg w-full lg:w-1/2 fixed-size-container">
                    <h2 className="text-2xl font-bold mb-4 text-center">COVID-19 Case Fluctuations</h2>
                    {graphData && (
                        <Line
                            data={{
                                labels: Object.keys(graphData.cases),
                                datasets: [
                                    {
                                        label: 'Cases',
                                        data: Object.values(graphData.cases),
                                        borderColor: 'rgba(75,192,192,1)',
                                        fill: false,
                                    },
                                    {
                                        label: 'Deaths',
                                        data: Object.values(graphData.deaths),
                                        borderColor: 'rgba(255,99,132,1)',
                                        fill: false,
                                    },
                                    {
                                        label: 'Recovered',
                                        data: Object.values(graphData.recovered),
                                        borderColor: 'rgba(153,102,255,1)',
                                        fill: false,
                                    },
                                ],
                            }}
                            options={{
                                maintainAspectRatio: false,
                            }}
                            width={400} // Fixed width
                            height={300} // Fixed height
                        />
                    )}
                </div>

                {/* Map with markers for each country */}
                <div className="bg-white shadow-md p-6 rounded-lg w-full lg:w-1/2 h-[400px] fixed-size-container">
                    <h2 className="text-2xl font-bold mb-4 text-center">COVID-19 Cases by Country</h2>
                    <MapContainer center={center} zoom={3} style={{ height: '80%', width: '100%' }}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        {countriesData?.map((country) => (
                            <Marker
                                key={country.country}
                                position={[country.countryInfo.lat, country.countryInfo.long] as LatLngExpression}
                                icon={markerIcon}
                            >
                                <Popup>
                                    <h2>{country.country}</h2>
                                    <p>Active: {country.active}</p>
                                    <p>Recovered: {country.recovered}</p>
                                    <p>Deaths: {country.deaths}</p>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>
            </div>
        </div>
    );
};

export default ChartsPage;
