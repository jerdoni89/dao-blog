import Scroll from 'quill/blots/scroll';
import Emitter from 'quill/core/emitter';

export class DragDropScroll extends Scroll {
    constructor(registry: any, domNode: HTMLDivElement, { emitter }: {
        emitter: Emitter;
    }) {
        super(registry, domNode, { emitter });
        this.domNode.addEventListener('drop', (e) => this.handleDrop(e), true);
    }

    handleDrop(e: any) {
        if (e.dataTransfer.files.length == 0)
            e.stopImmediatePropagation();
    }

    override handleDragStart(_event: DragEvent): void { }
    
}