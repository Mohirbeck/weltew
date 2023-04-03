module.exports = {
    apps: [
        {
            name: 'Weltew',
            exec_mode: 'cluster',
            instances: 'max',
            script: './node_modules/next/dist/bin/next',
            args: 'start'
        }
    ]
}