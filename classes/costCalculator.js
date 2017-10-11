class CostCalculator{
    static getCost(numberOwned, baseCost){
        return Math.floor(baseCost * Math.pow(1.15, numberOwned))
    }
}

export default CostCalculator;