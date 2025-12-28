const mqtt = require('mqtt');
const {getIO} = require('../socket.service');
const Device = require('../../models/device.model');
const SensorData = require('../../models/sensordata.model');
const airHelper = async (action, data) => {
    const deviceName = data.device;
    const value = data.value;
    const device = await Device.findOne({ name: deviceName });
    let sensorData = new SensorData({
        deviceName,
        device_id: device._id,
        sensorType: 'air_quality',
        number_value: value,
        unit: 'AQI',
    });
    switch (action) {
        case 'CO2':
            sensorData = { ...sensorData, sensorType: 'co2', unit: 'ppm' };
            await sensorData.save();
            break;
        case 'NH3':
            sensorData = { ...sensorData, sensorType: 'nh3', unit: 'ppm' };
            await sensorData.save();
            break;
        case 'NOx':
            sensorData = { ...sensorData, sensorType: 'nox', unit: 'µg/m³' };
            await sensorData.save();
            break;
        case 'Alcohol':
            sensorData = { ...sensorData, sensorType: 'alcohol', unit: 'ppm' };
            await sensorData.save();
            break;
        case 'Benzene':
            sensorData = { ...sensorData, sensorType: 'benzene', unit: 'ppm' };
            await sensorData.save();
            break;
        default:
            console.log(`Unknown air quality action: ${action}`);
            return;
    }
    const io = getIO();
    io.emit('air_quality', {
        deviceName,
        sensorType: sensorData.sensorType,
        value,
        unit: sensorData.unit,
        timestamp: sensorData.timestamp
    });

    console.log(`Air Quality Helper Invoked - Action: ${action}, Device: ${deviceName}, Data:`, data);
}
module.exports = { airHelper };