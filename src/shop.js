import List from './list'
import Cart from './cart'
import FeedbackInputs from './feedbackinputs'
import './truncate'
import './style.sass'

const CartInstane = new Cart()
new List(CartInstane)
new FeedbackInputs()