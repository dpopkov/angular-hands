import {Component} from '@angular/core';

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
}
