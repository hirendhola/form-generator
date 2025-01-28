import express from 'express';
import dotenv from 'dotenv'
import Formroutes from './routes/form/formRoute.js';
import Adminroutes from './routes/admin/admin.js';
import cors from 'cors';
const app = express();
dotenv.config();

app.use(cors({
  origin: process.env.ORIGIN_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', Formroutes);
app.use('/api', Adminroutes);


app.all('/', (req, res) => {
  res.send('Hello World');
})

app.listen(process.env.PORT, () => {
  console.log(`Server is running `);
});