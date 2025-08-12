import { COLORS } from "../helpers/colors.ts";
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

   undo(): CodeEditorState | null {
      if (this.currentIndex > 0) {
         this.currentIndex--;
         return this.history[this.currentIndex];
      }
      return null;
   }

   redo(): CodeEditorState | null {
      if (this.currentIndex < this.history.length -1 ) {
         this.currentIndex++;
         return this.history[this.currentIndex];
      };
      return null;
   }
}

function main(){

   const history = new CodeEditorHistory();
   let editorState = new CodeEditorState('Initial content', 0, false);

   history.save(editorState);
   console.log("%cInitial State:", COLORS.blue);
   editorState.displayState();

   editorState = editorState.copyWith({ content: 'Updated content', cursorPosition: 5, unsavedChanges: true });
   history.save(editorState);
   console.log("%cAfter Update:", COLORS.red);
   editorState.displayState();

   editorState = editorState.copyWith({ cursorPosition: 10 });
   history.save(editorState);
   console.log("%cAfter Cursor Move:", COLORS.yellow);
   editorState.displayState();

   console.log("%cDespues del undo:", COLORS.orange);
   history.undo()?.displayState();

   console.log("%cDespues del redo:", COLORS.orange);
   history.redo()?.displayState();

}

main();