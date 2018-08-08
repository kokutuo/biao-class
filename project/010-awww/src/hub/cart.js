import Vue from 'vue';
import api from '../lib/api';

export const hub = {
  cart: {}
};

/**
 * 获取包括购物车在内的全部数据
 */
export function all() {
  return hub;
}

export function read() {
  api('cart/read', {
    key_by: 'id',
    with: 'has_one:pet',
    limit: 50
  }).then(r => Vue.set(hub, 'cart', r.data));
}

export function add(pet_id, count) {
  api('cart/create', {
    pet_id,
    count
  }).then(() => read());
}

export function remove(id) {
  api('cart/delete', {
    id
  }).then(() => read());
}

export function update(id, row) {
  row.id = id;
  api('cart/update', row).then(() => read());
}

export function count() {
  return Object.keys(hub.cart).length;
}

/**
 * 将购物车中的每一项分别传递给回调函数fn
 * @param {function} fn 回调函数
 */
export function each(fn) {
  for (const id in hub.cart) {
    if (hub.cart.hasOwnProperty(id)) {
      const it = hub.cart[id];
      fn(it, id);
    }
  }
}

/**
 * 通过宠物id在购物车中查找宠物
 * @param {int} pet_id 宠物id
 * @returns 返回找到的宠物
 */
export function find_by_pet_id(pet_id) {
  for (const id in hub.cart) {
    if (hub.cart.hasOwnProperty(id)) {
      const it = hub.cart[id];
      if (it.pet_id == pet_id) {
        return it;
      }
    }
  }
}

export function pet_exist(pet_id) {
  return !!find_by_pet_id(pet_id);
}

function init() {
  read();
}

init();