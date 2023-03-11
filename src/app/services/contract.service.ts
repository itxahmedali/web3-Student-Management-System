import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ethers } from 'ethers';
import { UniversalService } from './universal.service';
const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "message",
        "type": "string"
      }
    ],
    "name": "Success",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "courseName",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "courseFee",
        "type": "uint256"
      }
    ],
    "name": "addCourse",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_studentId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "grade",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "courseIndex",
        "type": "uint256"
      }
    ],
    "name": "addGrades",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "studentName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_studentAddress",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "studentAge",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "studentNumber",
        "type": "uint256"
      }
    ],
    "name": "addStudent",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_studentId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_courseId",
        "type": "uint256"
      }
    ],
    "name": "assignCourse",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_studentId",
        "type": "uint256"
      }
    ],
    "name": "checkTotalFee",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "courseId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "courses",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "fee",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllStudents",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "studentaddress",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "age",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "number",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "uint256[]",
            "name": "courses",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256[]",
            "name": "grades",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256[]",
            "name": "attendance",
            "type": "uint256[]"
          },
          {
            "internalType": "bool",
            "name": "feeStatus",
            "type": "bool"
          }
        ],
        "internalType": "struct StudentContract.StudentData[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_studentId",
        "type": "uint256"
      }
    ],
    "name": "getAssignedCourses",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_studentId",
        "type": "uint256"
      }
    ],
    "name": "getAssignedCoursesWithGrades",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getContractBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_studentId",
        "type": "uint256"
      }
    ],
    "name": "getStudent",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "studentaddress",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "age",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "number",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "uint256[]",
            "name": "courses",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256[]",
            "name": "grades",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256[]",
            "name": "attendance",
            "type": "uint256[]"
          },
          {
            "internalType": "bool",
            "name": "feeStatus",
            "type": "bool"
          }
        ],
        "internalType": "struct StudentContract.StudentData",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_studentId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_attendance",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "courseIndex",
        "type": "uint256"
      }
    ],
    "name": "markAttendance",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_studentId",
        "type": "uint256"
      }
    ],
    "name": "payCoursesFees",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "studentId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "studentPayments",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "students",
    "outputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "studentaddress",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "age",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "number",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "feeStatus",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "viewCourses",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "fee",
            "type": "uint256"
          }
        ],
        "internalType": "struct StudentContract.Course[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]
declare let window: any;
@Injectable({
  providedIn: 'root'
})
export class ContractService {
  constructor(private router:Router) { }
  async connectWallet() {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (accounts) {
          console.log(accounts);
          // this.addStudent()
          // this.getStudents()
        } else {
          console.log("connect metamask Account");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  async getCourses() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      const result = await contract;
      const courses = await result['viewCourses']()
      return courses;
    } catch (error) {
      console.log("Error calling contract function:", error);
    }
  }
  async addCourse(data:any) {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      const result = await contract;
      const courses = await result['addCourse'](data?.courseName, data?.courseFee)
      await courses.wait();
      this.router.navigateByUrl('dashboard/courses')
      await UniversalService.header.next("Courses")
      await UniversalService.AddCourse.next(true)
    } catch (error) {
      console.log("Error calling contract function:", error);
    }
  }
  async getStudents() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      const result = await contract;
      const studetns = await result['getAllStudents']()
      console.log(result['getAllStudents'](), 'resukt', studetns);
    } catch (error) {
      console.log("Error calling contract function:", error);
    }
  }
  async addStudent(name:string,address:string,age:number,number:number) {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      const result = await contract;
      const students = await result['addStudent'](name,address,age,number)
      await students.wait();
      this.router.navigateByUrl('dashboard/students')
      await UniversalService.header.next("Students")
      await UniversalService.AddStudent.next(true)
    } catch (error) {
      console.log("Error calling contract function:", error);
    }
  }
}
