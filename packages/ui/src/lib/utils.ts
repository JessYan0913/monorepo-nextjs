import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const validateIdNumber = (value: string) => {
  // 18位身份证号正则
  const idCard18 = /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]$/;
  // 15位身份证号正则
  const idCard15 = /^[1-9]\d{7}((0[1-9])|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
  
  if (!idCard18.test(value) && !idCard15.test(value)) {
    return false;
  }
  
  // 18位身份证校验码验证
  if (value.length === 18) {
    const weight = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    const checkCode = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
    
    let sum = 0;
    for (let i = 0; i < 17; i++) {
      sum += parseInt(value[i]) * weight[i];
    }
    
    const mod = sum % 11;
    if (value[17].toUpperCase() !== checkCode[mod]) {
      return false;
    }
  }
  
  return true;
}
