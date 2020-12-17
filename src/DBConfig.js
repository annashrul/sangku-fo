export const DBConfig = {
    name: 'backoffice_shop',
    version: 1,
    objectStoresMeta: [
        {
            store: 'sess',
            storeConfig: { keyPath: 'id', autoIncrement: true },
            storeSchema: [
                { name: 'id',keypath:'id',options:{unique:false}},
                { name: 'token',keypath:'token',options:{unique:false}},
                { name: 'nama',keypath:'nama',options:{unique:false}},
                { name: 'username',keypath:'username',options:{unique:false}},
                { name: 'status',keypath:'status',options:{unique:false}},
                { name: 'alamat',keypath:'alamat',options:{unique:false}},
                { name: 'tlp',keypath:'tlp',options:{unique:false}},
                { name: 'foto',keypath:'foto',options:{unique:false}},
                { name: 'unique_code',keypath:'unique_code',options:{unique:false}},
                { name: 'level',keypath:'level',options:{unique:false}},
                { name: 'akses',keypath:'akses',options:{unique:false}},
                { name: 'created_at',keypath:'created_at',options:{unique:false}}
                
            ]
        },
    ]
};