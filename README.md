# Wukong
Wukong is a mock server for frontend.

# Usage
1. Clone this repository.
2. Open teminal
3. Enter Wukong home directory.
4. Run command : npm start
5. Open browser and access demo url : http://localhost:7272/modules

# Configuration
Wukong's configuration file is **wukong.config.js** which is in Wukong home directory.
```javascript
const config = {
    port : 7272,                        //server port
    storage : {
		engine : 'fs',                  //storage engine: fs, mysql, etc...
		mappings  : ['data/mappings'],    // mapping files directory
		dataPath  : ['data/datas'],       // data files directory
		tmplPath  : ['data/tmpls'],       // template files directory
        libPath   : ['data/lib'],       // global lib files directory
        mylibPath : ['data/lib/my']     // my lib files directory
	}
};
```

# Template
