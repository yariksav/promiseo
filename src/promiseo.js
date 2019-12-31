/*
 * promiseo
 *
 * (c) Savaryn Yaroslav <yariksav@gmail.com>
 *
 * Some functions was imported from nuxt.js/lib/app/utils.js
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

const isFunction = fn => typeof fn === 'function'

const isNil = s => s === null || s === undefined

const isPromise = promise => {
  return promise && (promise instanceof Promise || isFunction(promise.then))
}

function promiseo (fn, context) {
  let promise
  if (isFunction(fn)) {
    promise = fn.call(this, context)
  } else {
    promise = fn
  }

  if (!isPromise(promise)) {
    if (typeof promise === 'object') {
      return checkObjectForPromises.call(this, promise, context)
    } else {
      promise = Promise.resolve(promise)
    }
  }

  const self = this
  return promise.then(data => {
    return checkObjectForPromises.call(self, data, context)
  })
}

function hasAsync (obj) {
  if (!obj || typeof obj !== 'object') {
    return false
  }
  for (const key in obj) {
    if (isPromise(obj[key]) || isFunction(obj[key])) {
      return true
    }
  }
  return false
}

function checkObjectForPromises (obj, context = {}) {
  const promises = []
  const self = this
  const data = {}
  if (typeof obj !== 'object') {
    return obj
  }
  for (const key in obj) {
    let something = obj[key]

    // data[key] = null
    if (isFunction(something)) {
      something = something.call(this, context)
    }
    if (isPromise(something)) {
      something = something.then(res => {
        if (isNil(res)) {
          return
        }
        if (key.startsWith('...')) {
          Object.assign(data, res)
        } else {
          data[key] = res
        }
        return res
      })
      if (context && isFunction(context.asyncDataError)) {
        something = something.catch(error => {
          return context.asyncDataError.call(self, error, { key, obj })
        })
      }
      promises.push(something)
    } else {
      if (context.deep && hasAsync(something)) {
        data[key] = null
        promises.push(checkObjectForPromises.call(self, something, context).then(res => {
          data[key] = res
        }))
      } else {
        data[key] = something
      }
    }
  }
  return Promise.all(promises).then(() => {
    return Promise.resolve(data)
  })
}

module.exports = promiseo
