import {Component} from '@angular/core';
import {Book, Video} from "../model/Model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ExploringTypescript';

  myNumber: number;
  readonly immutableNumber: number = 42;

  declaringVariablesInMethod(): void {
    let anotherNumber = 0;
    const thirdNumber = 123;

    anotherNumber = 321;
    // anotherNumber = 'Hello'; // error
    // thirdNumber = 321; // error
    console.log('anotherNumber = ', anotherNumber)
    console.log('thirdNumber = ', thirdNumber)
  }

  useClassVariables(): void {
    console.log('this.myNumber = ', this.myNumber);
    console.log('this.immutableNumber = ', this.immutableNumber);
  }

  exploringArrays(): void {
    const myArray1 = new Array<number>(5);    // Java style
    const myArray2: Number[] = [11, 22, 33, 44];        // JavaScript style

    console.log('myArray1 = ', myArray1);
    console.log('myArray2 = ', myArray2);

    console.log('myArray2[1] = ', myArray2[1]);
    // Slice method
    console.log('myArray2.slice(0, 1) = ', myArray2.slice(0, 1));
    console.log('myArray2.slice(0, 2) = ', myArray2.slice(0, 2));
    console.log('myArray2.slice(0, 3) = ', myArray2.slice(0, 3));
    console.log('myArray2.slice(1, 3) = ', myArray2.slice(1, 3));
    // Splice method
    console.log('myArray2.splice(1, 2) = ', myArray2.splice(1, 2));
    console.log('myArray2 = ', myArray2);
    // Push method
    myArray2.push(55);
    myArray2.push(56);
    console.log('myArray2 = ', myArray2);
    // Pop method
    let pop1 = myArray2.pop();
    console.log('myArray2.pop() = ', pop1);
    let pop2 = myArray2.pop();
    console.log('myArray2.pop() = ', pop2);
  }

  exploringLoopsInJavaStyle(): void {
    const myArray: Number[] = [11, 22, 33, 44];
    for (let i = 0; i < myArray.length; i++) {  // Java style
      console.log('myArray[' + i + '] = ' + myArray[i]);
    }
  }

  exploringLoopsInAngularStyle(): void {
    const myArray: Number[] = [11, 22, 33, 44];
    console.log('values:')
    for (const next of myArray) {  // Idiomatic Angular style for values
      console.log('next = ' + next);
    }
    console.log('indexes:')
    for (const index in myArray) {  // Idiomatic Angular style for indexes
      console.log('index = ' + index);
    }
  }

  exploringWhileLoops(): void {
    let num = 42;
    while (num > 40) {
      console.log('num = ' + num);
      num--;
    }
  }

  understandingJavaScriptObjects(): void {
    let myCustomer = {
      firstName: 'Jane Doe',
      age: 29
    }
    console.log('myCustomer = ', myCustomer);
    console.log('typeof myCustomer = ', (typeof myCustomer));
  }

  creatingClasses(): void {
    let myVideo : Video;
    const myBook = new Book('James');
    console.log('myBook = ', myBook);
    myBook.title = 'Core Something';
    console.log('myBook = ', myBook);
    myBook.author = 'Jane'
    console.log('myBook = ', myBook);

    myBook.price = -42;
    console.log('myBook = ', myBook);
    myBook.price = 42;
    console.log('myBook = ', myBook);
  }

  exploringMethods(): void {
    const myBook = new Book('James', 'Effective Something');
    myBook.price = 100;
    console.log('myBook.priceWithTax(.2) = ' + myBook.priceWithTax(.2));
  }

  exploringArrowFunctions(): void {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const oddNumbers = numbers.filter(
      (num) => {
        return num % 2 === 1;
      });
    console.log('oddNumbers = ' + oddNumbers);
    const evenNumbers = numbers.filter(num => num % 2 === 0);
    console.log('evenNumbers = ' + evenNumbers);
  }

  usingStringTemplates(): void {
    const myBook = new Book('James', 'Effective Something');
    console.log(`myBook.toString() = ${myBook.toString()}`);
    console.log(`myBook = ${myBook}`);
    console.log(myBook);  // method toString is not used here
    console.log('myBook = ', myBook);  // method toString is not used here
    console.log('myBook concatenated = ' + myBook);
  }

  exploringObjectEquality(): void {
    console.log('1 == 1', 1 == 1);
    console.log('1 === 1', 1 === 1);
    // @ts-ignore
    console.log('\'1\' == 1', `1` == 1); // Fails to compile without @ts-ignore comment
    // @ts-ignore
    console.log('\'1\' === 1', `1` === 1); // Fails to compile without @ts-ignore comment
  }

  exploringUndefined(): void {
    let myValue: number;  // not initialized variable
    // @ts-ignore
    console.log('myValue === null :', myValue === null);
    // @ts-ignore
    console.log('myValue === undefined :', myValue === undefined);
    // @ts-ignore
    console.log('myValue == null :', myValue == null);
  }
}
