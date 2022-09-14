export const Configuration = {
    profile: 'dev',
    baseUrl: 'http://localhost:8090/',
    resourceVersion: 'expense/api/v1/',
    group: 'group/',
    version: '0.0.1',
    github: 'https://github.com/codesnaper/expense',
    wsUrl: 'ws://localhost:8090/expense/ws/connect'
}

export const NavigationLink = [
    { name: 'Add Expense', link: '/bank' },
    { name: 'Set Limit', link: '/limit' },
    { name: 'Categories', link: '/category' },
    { name: 'Banks', link: '/bank' },
    { name: 'Goal', link: '/goal' }
];