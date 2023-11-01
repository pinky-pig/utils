/* eslint-disable @typescript-eslint/no-loss-of-precision */

const PI = 3.1415926535897932384626

// 用于表示地球的长半轴,偏心率的平方。是地球椭球模型的参数
const a = 6378245.0
const ee = 0.00669342162296594323

/** 判断是否在国内，不在国内则不做偏移 */
function out_of_china(lng: number, lat: number) {
  return lng < 72.004 || lng > 137.8347 || lat < 0.8293 || lat > 55.8271 || false
}
function transformlat(lng: number, lat: number) {
  let ret
    = -100.0
    + 2.0 * lng
    + 3.0 * lat
    + 0.2 * lat * lat
    + 0.1 * lng * lat
    + 0.2 * Math.sqrt(Math.abs(lng))
  ret += ((20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0) / 3.0
  ret += ((20.0 * Math.sin(lat * PI) + 40.0 * Math.sin((lat / 3.0) * PI)) * 2.0) / 3.0
  ret += ((160.0 * Math.sin((lat / 12.0) * PI) + 320 * Math.sin((lat * PI) / 30.0)) * 2.0) / 3.0
  return ret
}
function transformlng(lng: number, lat: number) {
  let ret
    = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng))
  ret += ((20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0) / 3.0
  ret += ((20.0 * Math.sin(lng * PI) + 40.0 * Math.sin((lng / 3.0) * PI)) * 2.0) / 3.0
  ret += ((150.0 * Math.sin((lng / 12.0) * PI) + 300.0 * Math.sin((lng / 30.0) * PI)) * 2.0) / 3.0
  return ret
}

/**
 * WGS84转GCJ02
 * @param lng 经度 , lat 纬度
 * @returns
 */
export function WGS84ToGCJ02(lng: number, lat: number) {
  if (out_of_china(lng, lat))
    return [lng, lat]

  let dLat = transformlat(lng - 105.0, lat - 35.0)
  let dLng = transformlng(lng - 105.0, lat - 35.0)
  const radlat = (lat / 180.0) * PI
  let magic = Math.sin(radlat)
  magic = 1 - ee * magic * magic
  const sqrtMagic = Math.sqrt(magic)
  dLat = (dLat * 180.0) / (((a * (1 - ee)) / (magic * sqrtMagic)) * PI)
  dLng = (dLng * 180.0) / ((a / sqrtMagic) * Math.cos(radlat) * PI)
  const mgLat = lat + dLat
  const mgLng = lng + dLng
  return [mgLng, mgLat]
}

/**
 * GCJ02转WGS84
 * @param lng 经度 , lat 纬度
 * @returns
 */
export function GCJ02ToWGS84(lng: number, lat: number) {
  if (out_of_china(lng, lat))
    return [lng, lat]

  let dLat = transformlat(lng - 105.0, lat - 35.0)
  let dLng = transformlng(lng - 105.0, lat - 35.0)
  const radlat = (lat / 180.0) * PI
  let magic = Math.sin(radlat)
  magic = 1 - ee * magic * magic
  const sqrtMagic = Math.sqrt(magic)
  dLat = (dLat * 180.0) / (((a * (1 - ee)) / (magic * sqrtMagic)) * PI)
  dLng = (dLng * 180.0) / ((a / sqrtMagic) * Math.cos(radlat) * PI)
  const mgLat = lat + dLat
  const mgLng = lng + dLng
  return [lng * 2 - mgLng, lat * 2 - mgLat]
}
