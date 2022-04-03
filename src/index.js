class Sensor {
    constructor(id) {
        this.id = id;
        this.powerStatus = 'off';
        this.status = '';
        this.reportingInterval = 10000;
    }

    turn(powerStatus) {
        if (powerStatus === this.powerStatus) throw Error('이미 켜져 있는 기기는 또 켤 수 없습니다.')
        if (powerStatus === 'off') {
            this.powerStatus = 'off';
        }
        if (powerStatus === 'on') {
            this.powerStatus = 'on';
            this.status = 'idle';
            setTimeout(() => this.status = 'sensingDistance', this.reportingInterval);
            setTimeout(() => this.status = 'reportingData', this.reportingInterval + 500);
            setTimeout(() => this.status = 'idle', this.reportingInterval + 1500);
        }
    }
}

class IotServer {
    constructor() {
        this.sensors = [];
    }

    start(sensor) {
        this.sensors = sensor;
    }

    publish(action) {
        let [server] = this.sensors;
        console.log(server.powerStatus)
        if (action.actionId === 'CHANGE_REPORTING_INTERVAL' && server.powerStatus === 'on') server.reportingInterval = action.payload;
    }
}

module.exports = {
    Sensor,
    IotServer,
};
