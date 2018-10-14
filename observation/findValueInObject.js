var findValueInObject = (function(){
    let validTypes = ["string", "number", "boolean"];
    function innerFinderFunction(object, valueToFind, valueType, matchType, contain, allProperties, path, map, callback){
        if(map.has(object) || !(object instanceof Object))return;
        map.set(object, true);
        for(let key in object){
            if(!allProperties && !object.hasOwnProperty(key)){
                continue;
            }
            let innerPath = path.slice(0);
            innerPath.push(key);
            let value = object[key],
                thisValueType = typeof value;
            if(validTypes.indexOf(thisValueType) !== -1){
                if(!matchType || valueType === thisValueType){
                    if(contain ? value.toString().indexOf(valueToFind.toString()) !== -1 : value.toString() === valueToFind.toString()){
                        callback(innerPath);
                    }
                }
            }
            innerFinderFunction(object[key], valueToFind, valueType, matchType, contain, allProperties, innerPath, map, callback);
        }
    }
    return function(object, valueToFind, matchType, contain, allProperties){
        let map = new WeakMap(),
            results = [],
            valueType = typeof valueToFind;
        if(validTypes.indexOf(valueType) === -1){
            return [];
        }
        innerFinderFunction(object, valueToFind, valueType, matchType, contain, allProperties, [], map, function(result){
            results.push(result);
        });
        return results;
    }
})();
