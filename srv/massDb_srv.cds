
using app from '../db/massDb';


service StudentsSrv @(path: '/catalog'){
@cds.persistence.skip
@odata.singleton
 entity ExcelUpload {
        @Core.MediaType : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        excel : LargeBinary;
    };

entity Students as projection on app.Students;
entity ERROR_LOG as projection on app.ERROR_LOG;
}
