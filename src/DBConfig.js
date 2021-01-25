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
        {
            store: 'rekapitulasi',
            storeConfig: { keyPath: 'id', autoIncrement: true },
            storeSchema: [
                { name: 'id',keypath:'id',options:{unique:false}},
                { name: 'badge',keypath:'badge',options:{unique:false}},
                { name: 'balance_kanan',keypath:'balance_kanan',options:{unique:false}},
                { name: 'balance_kiri',keypath:'balance_kiri',options:{unique:false}},
                { name: 'hak_bonus',keypath:'hak_bonus',options:{unique:false}},
                { name: 'membership',keypath:'membership',options:{unique:false}},
                { name: 'nominal_bonus',keypath:'nominal_bonus',options:{unique:false}},
                { name: 'pairing_bonus',keypath:'pairing_bonus',options:{unique:false}},
                { name: 'pertumbuhan_kanan',keypath:'pertumbuhan_kanan',options:{unique:false}},
                { name: 'pertumbuhan_kiri',keypath:'pertumbuhan_kiri',options:{unique:false}},
                { name: 'sisa_plafon',keypath:'sisa_plafon',options:{unique:false}},
                { name: 'tabungan_kanan',keypath:'tabungan_kanan',options:{unique:false}},
                { name: 'tabungan_kiri',keypath:'tabungan_kiri',options:{unique:false}}
                
            ]
        },
        // {
        //     store: 'cart',
        //     storeConfig: { keyPath: 'id', autoIncrement: true },
        //     storeSchema: [
        //         { name: 'id',keypath:'id',options:{unique:false}},
        //         { name: 'id_member',keypath:'id_member',options:{unique:false}},
        //         { name: 'id_paket',keypath:'id_paket',options:{unique:false}},
        //         { name: 'kategori',keypath:'kategori',options:{unique:false}},
        //         { name: 'berat',keypath:'berat',options:{unique:false}},
        //         { name: 'created_at',keypath:'created_at',options:{unique:false}},
        //         { name: 'foto',keypath:'foto',options:{unique:false}},
        //         { name: 'full_name',keypath:'full_name',options:{unique:false}},
        //         { name: 'harga',keypath:'harga',options:{unique:false}},
        //         { name: 'point_volume',keypath:'point_volume',options:{unique:false}},
        //         { name: 'qty',keypath:'qty',options:{unique:false}},
        //         { name: 'title',keypath:'title',options:{unique:false}},
        //         { name: 'type',keypath:'type',options:{unique:false}},
        //         { name: 'updated_at',keypath:'updated_at',options:{unique:false}}
        //     ]
        // },
    ]
};