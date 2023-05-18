const express = require('express');
const mongoose = require('mongoose');
const cort = require('cors');

const app = express();

app.use(express.json());
app.use(cors());