import { list, check, home } from './Icons'

const menu = [
  {
    id: 1,
    title: 'All Vacations',
    icon: home,
    link: '/'
  },
  {
    id: 2,
    title: 'Important!',
    icon: list,
    link: '/important'
  },
  {
    id: 3,
    title: 'Completed!',
    icon: check,
    link: '/completed'
  }
]

export default menu
