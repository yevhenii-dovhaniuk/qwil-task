export class DisplayObject {
    constructor(public temperature: string, public humidity: string, public pressure: string) {
        this.temperature = temperature;
        this.humidity = humidity;
        this.pressure = pressure;
    }

    public isEmpty(): boolean {
        return this.temperature === 'N/A' && this.humidity === 'N/A' && this.pressure === 'N/A';
    }
}
