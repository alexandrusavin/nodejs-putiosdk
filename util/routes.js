module.exports = [
/**
 * @name File#list
 * @function
 * @param {Object} params
 * @param {Number} params.parent_id
 * @param {Function} cb
 */
    {
        name: 'list',
        route: '/files/list/:parent_id',
        method: 'GET',
        returns: ['files', 'parent']
    },

/**
 * @name File#search
 * @function
 * @param {Object} params
 * @param {Function} cb
 */
    {
        name: 'search',
        route: '/files/search/:query/page(/:page_no)',
        method: 'GET',
        returns: ['files', 'next']
    },

/**
 * @name File#get
 * @function
 * @param {Object} params
 * @param {Function} cb
 */
    {
        name: 'get',
        route: '/files/:file_id',
        method: 'GET',
        returns: ['file']
    },

/**
 * @name File#delete
 * @function
 * @param {Object} params
 * @param {Function} cb
 */
    {
        name: 'delete',
        route: '/files/delete',
        method: 'POST',
        params: ['file_ids']
    },

/**
 * @name File#upload
 * @function
 * @param {Object} params
 * @param {Function} cb
 */
    {
        name: 'upload',
        route: '/files/upload',
        method: 'POST',
        params: [
            'file',
            'filename',
            'parent_id'
        ],
        returns: [
            'file',
            'transfer'
        ]
    },

/**
 * @name File#createFolder
 * @function
 * @param {Object} params
 * @param {String} params.name
 * @param {Number} params.parent_id
 * @param {Function} cb
 */
    {
        name: 'createFolder',
        route: '/files/create-folder',
        method: 'POST',
        params: [
            'name',
            'parent_id'
        ]
    },

/**
 * @name File#rename
 * @function
 * @param {Object} params
 * @param {Number} params.file_id
 * @param {String} params.name
 * @param {Function} cb
 */
    {
        name: 'rename',
        route: '/files/rename',
        method: 'POST',
        params: [
            'file_id',
            'name'
        ]
    },

/**
 * @name File#move
 * @function
 * @param {Object} params
 * @param {Number} parent_id
 * @param {String} file_ids
 * @param {Function} cb
 */
    {
        name: 'move',
        route: '/files/move',
        method: 'POST',
        params: [
            'parent_id',
            'file_ids'
        ]
    },

/**
 * @name File#convertMp4
 * @function
 * @param {Object} params
 * @param {Number} params.file_id
 * @param {Function} cb
 */
    {
        name: 'convertMp4',
        route: '/files/:file_id/mp4',
        method: 'POST'
    },

/**
 * @name File#getMp4
 * @function
 * @param {Object} params
 * @param {Number} params.file_id
 * @param {Function} cb
 */
    {
        name: 'getMp4',
        route: '/files/:file_id/mp4',
        method: 'GET',
        returns:[
            'mp4'
        ]
    },
/**
 * @name File#download
 * @function
 * @param {Object} params
 * @param {Number} params.file_id
 * @returns {Request}
 */
    {
        name: 'download',
        route: '/files/:file_id/download',
        method: 'GET',
        returns: []
    },
/**
 * @name File#zipDownload
 * @function
 * @param {Object} params
 * @param {String} params.file_ids
 * @param {Function} cb
 */
    {
        name: 'zipDownload',
        route: '/files/zip/:file_ids',
        method: 'GET',
        returns: [
            'zip_id'
        ]
    },
/**
 * @name File#share
 * @function
 * @param {Object} params
 * @param {String} params.file_ids
 * @param {String} params.friends
 * @param {Function} cb
 */
    {
        name: 'share',
        route: '/files/share',
        method: 'POST',
        parameters: [
            'file_ids',
            'friends'
        ]
    },
/**
 * @name File#shared
 * @function
 * @param {Object} params
 * @param {Function} cb
 */
    {
        name: 'shared',
        route: '/files/shared',
        method: 'GET',
        returns: [
            'shared'
        ]
    },
/**
 * @name File#sharedWith
 * @function
 * @param {Object} params
 * @param {Number} params.file_id
 * @param {Function} cb
 */
    {
        name: 'sharedWith',
        route: '/files/:file_id/shared-with',
        method: 'GET',
        returns: [
            'shared-with'
        ]
    },
/**
 * @name File#unshare
 * @function
 * @param {Object} params
 * @param {String} params.file_id
 * @param {String} params.shares
 * @param {Function} cb
 */
    {
        name: 'unshare',
        route: '/files/:file_id/unshare',
        method: 'GET',
        params: [
            'shares'
        ]
    }
];