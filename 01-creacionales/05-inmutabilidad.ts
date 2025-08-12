import { COLORS } from '../helpers/colors';
/**
 * ! Inmutabilidad con copia
 * Aunque la inmutabilidad es una buena práctica, no siempre es posible.
 * En estos casos, se puede hacer una copia del objeto y modificar la copia.
 *
 *  * Es útil para mantener un historial de estados en aplicaciones interactivas.
 *
 */
class CodeEditorState {
   readonly content: string;
   readonly cursorPosition: number;
   readonly unsavedChanges: boolean;

   constructor(
      content: string = '',
      cursorPosition: number = 0,
      unsavedChanges: boolean = false
   ) {
      this.content = content;
      this.cursorPosition = cursorPosition;
      this.unsavedChanges = unsavedChanges;
   }

   displayState(): void {
      console.log("%cCurrent Code Editor State:", COLORS.green);
      console.log(`Content: ${this.content}`);
      console.log(`Cursor Position: ${this.cursorPosition}`);
      console.log(`On Save Changes: ${this.unsavedChanges}`);
   }

   copyWith({
      content,
      cursorPosition,
      unsavedChanges
   }: Partial<CodeEditorState>): CodeEditorState {
      return new CodeEditorState(
         content ?? this.content,
         cursorPosition ?? this.cursorPosition,
         unsavedChanges ?? this.unsavedChanges
      );
   }
}

class CodeEditorHistory {
   private history: CodeEditorState[] = [];
   private currentIndex: number = -1;

   save(state: CodeEditorState): void {

      if (this.currentIndex < this.history.length - 1) {
         // Elimina los estados futuros si se está en medio de la historia
         this.history = this.history.slice(0, this.currentIndex + 1);
      }
      this.history.push(state);
      this.currentIndex++;
   }

   readonly(): CodeEditorState | null {
      if (this.currentIndex < this.history.length -1 ) {
         this.currentIndex++;
         return this.history[this.currentIndex];
      };
      return null;
   }
}

const vscode = new CodeEditorState();

vscode.displayState();