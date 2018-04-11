'use strict'

const {readFileSync} = require('fs')
const {describe, it} = require('mocha')
const {expect} = require('chai')
const parse = require('../src/parse')
const {join} = require('path')

const json1 = readFileSync(join(__dirname, 'data1.json'))
const json2 = readFileSync(join(__dirname, 'data2.json'))

const succeed = (json, done) => {
  parse(json, (err, entries) => {
    expect(err).to.equal(null)
    expect(entries).to.deep.equal(JSON.parse(json))
    done()
  })
}

const fail = (json, msg, done) => {
  parse(json, (err, entries) => {
    expect(err).to.be.an('error')
    if (msg) expect(err.message).to.equal(msg)
    expect(entries).to.equal(undefined)
    done()
  })
}

describe('parse', () => {
  it('parses json', done => succeed(json1, done))

  it('parses another json', done => succeed(json2, done))

  it('fails to parse invalid json', done => {
    fail(`
      [
        {
          "year": 2016,
          "month": 10,
          "kwh": 1500,
          "bill": 144.04,
          "savings": 19.81
        },
      ]
    `, null, done)
  })

  it('fails to parse json with invalid entry', done => {
    fail(`[{}]`, 'expected non-empty object for entry, got {}', done)
  })

  it('fails to parse json with invalid month', done => {
    fail(`
      [
        {
          "year": 2016,
          "month": 13,
          "kwh": 1500,
          "bill": 144.04,
          "savings": 19.81
        }
      ]
    `, 'expected positive integer <= 12 for entry.month, got 13', done)
  })

  it('fails to parse json with invalid bill', done => {
    fail(`
      [
        {
          "year": 2016,
          "month": 11,
          "kwh": 1500,
          "bill": -144.04,
          "savings": 19.81
        }
      ]
    `, 'expected positive number for entry.bill, got -144.04', done)
  })

  it('fails to parse json with invalid kwh', done => {
    fail(`
      [
        {
          "year": 2016,
          "month": 10,
          "kwh": 0,
          "bill": 144.04,
          "savings": 19.81
        }
      ]
      `, 'expected positive number for entry.kwh, got 0', done)
  })

  it('fails to parse json with invalid bill', done => {
    fail(`
      [
        {
          "year": 2016,
          "month": 10,
          "kwh": 100,
          "bill": -0.1,
          "savings": 19.81
        }
      ]
      `, 'expected positive number for entry.bill, got -0.1', done)
  })

  it('fails to parse json with invalid savings', done => {
    fail(`
      [
        {
          "year": 2016,
          "month": 10,
          "kwh": 100,
          "bill": 0.1,
          "savings": "cash"
        }
      ]
      `, 'expected number for entry.savings, got "cash"', done)
  })

  it('fails to parse json with invalid array of entries', done => {
    fail('[]', 'expected non-empty array for entries, got []', done)
  })

  it('fails to parse json with duplicate entries', done => {
    fail(`
      [
        {
          "year": 2016,
          "month": 10,
          "kwh": 1500,
          "bill": 144.04,
          "savings": 19.81
        },
        {
          "year": 2016,
          "month": 10,
          "kwh": 150,
          "bill": 144.4,
          "savings": 19.8
        }
      ]
    `, 'got duplicate entries for 10/2016', done)
  })
})
