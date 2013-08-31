Ext.define('TrWeb.model.Peer', {
  extend: 'Ext.data.Model',

  fields: [
    { name: 'id',                 type: 'string'  },
    { name: 'address',            type: 'string'  },
    { name: 'clientName',         type: 'string'  },
    { name: 'clientIsChoked',     type: 'boolean' },
    { name: 'clientIsInterested', type: 'boolean' },
    { name: 'flagStr',            type: 'string'  },
    { name: 'isDownloadingFrom',  type: 'boolean' },
    { name: 'isEncrypted',        type: 'boolean' },
    { name: 'isIncoming',         type: 'boolean' },
    { name: 'isUploadingTo',      type: 'boolean' },
    { name: 'isUTP',              type: 'boolean' },
    { name: 'peerIsChoked',       type: 'boolean' },
    { name: 'peerIsInterested',   type: 'boolean' },
    { name: 'port',               type: 'int'     },
    { name: 'progress',           type: 'double'  },
    { name: 'rateToClient',       type: 'int'     },
    { name: 'rateToPeer',         type: 'int'     }
  ]
});
