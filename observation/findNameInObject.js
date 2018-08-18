var findNameInObject = (function(){
    function innerFinderFunction(object, keyToFind, contain, allProperties, path, map, callback){
        if(map.has(object) || !(object instanceof Object))return;
        map.set(object, true);
        for(var key in object){
            if(!allProperties && !object.hasOwnProperty(key)){
                continue;
            }
            var innerPath = path.slice(0);
            innerPath.push(key);
            var found = contain ? key.indexOf(keyToFind) !== -1 : key === keyToFind;
            if(found)callback(innerPath);
            innerFinderFunction(object[key], keyToFind, contain, allProperties, innerPath, map, callback);
        }
    }
    return function(object, keyToFind, contain, allProperties){
        var map = new WeakMap(),
            results = [];
        innerFinderFunction(object, keyToFind, contain, allProperties, [], map, function(result){
            results.push(result);
        });
        return results;
    }
})();
