import { StripeRepository } from "@/repositories/stripeRepository";
import { CreateBillingPortal } from "./useCases/biling/createBillingPortal";
import { CreateCustomer } from "./useCases/biling/createCustomer";
import { UserRepository } from "@/repositories/userRepository";
import { CreateSubscription } from "./useCases/biling/createSubscription";
import { FindSubscription } from "./useCases/biling/findSubscription";
import { RetriveProduct } from "./useCases/biling/retriveProduct";
import { UpdateUserUseCase } from "./useCases/updateUser";
import { CreateMateria } from "./useCases/materia/createMateria";
import { MateriaRepository } from "@/repositories/materiaRepository";
import { ListMaterias } from "./useCases/materia/listMaterias";
import { UpdateCustomer } from "./useCases/biling/updateCustomer";
import { UpdateSubscription } from "./useCases/biling/updateSubscription";
import { CreateFile } from "./useCases/file/createFile";
import { FileRepository } from "@/repositories/fileRepository";
import { ListFiles } from "./useCases/file/listFiles";
import { CreateFlashcardUseCase } from "./useCases/flashcard/createFlashcard";
import { FlashcardRepository } from "@/repositories/flashcard-repository";
import { FindManyFlashcard } from "./useCases/flashcard/findManyFlashcard";
import DeleteMateriaUseCase from "./useCases/materia/delete-materia";
import DeleteFlashcardUseCase from "./useCases/flashcard/delete-flashcard";
import DeleteFileUseCase from "./useCases/file/delete-file";
import { FindMateriaUseCase } from "./useCases/materia/find-materia";
import { UpdateFlashcardUseCase } from "./useCases/flashcard/update-flashcard";
import { FindFlashcardsRevisao } from "./useCases/flashcard/find-flashcards-revisao";
import { CreateQuestionarioUseCase } from "./useCases/questionario/create-questionario";
import { QuestionarioRepository } from "@/repositories/questionarioRepository";
import { ListQuestionariosUseCase } from "./useCases/questionario/list-questionarios";
import { GetQuestionarioUseCase } from "./useCases/questionario/get-questionario";
import { CheckSubscriptionStatus } from "./useCases/biling/checkSubscriptionStatus";
import { ListInvoices } from "./useCases/biling/listInvoices";
import { StripeSyncService } from "@/services/stripeSyncService";
import { CalculateFeatureUsage } from "./useCases/user/calculateFeatureUsage";
import { DeleteQuestionarioUseCase } from "./useCases/questionario/delete-questionario";
import { CreateCheckoutSession } from "./useCases/biling/create-checkout-session";
import { UpdateUserByCustomerIdUseCase } from "./useCases/user/update-user-by-customer-id";
import { FindUserByIdUseCase } from "./useCases/user/find-user-by-id";
import GeminiRepository from "@/repositories/gemini-repository";
import { CreateFlashcardByPDF } from "./useCases/flashcard/create-flashcard-by-pdf";
import { CreateManyFlashcardUseCase } from "./useCases/flashcard/create-many-flashcards";
import { CreateQuestionarioByPDFUseCase } from "./useCases/questionario/create-questionario-by-pdf";
import { CreatePerguntasQuestionarioUseCase } from "./useCases/questionario/gerar-perguntas";
import { CreateResponseFlashcard } from "./useCases/flashcard/create-response-flashcard";

const paymentGateway = new StripeRepository();
const userRepository = new UserRepository();
const materiaRepository = new MateriaRepository();
const fileRepository = new FileRepository();
const flashcardRepository = new FlashcardRepository();
const questionarioRepository = new QuestionarioRepository();
const geminiRepository = new GeminiRepository();

export const modules = {
    useCase : {
        billing : {
            createBillingPortal : new CreateBillingPortal(paymentGateway),
            createCustomer : new CreateCustomer(paymentGateway, userRepository),
            createSubscription : new CreateSubscription(paymentGateway, userRepository),
            findSubscription : new FindSubscription(paymentGateway),
            retriveProduct : new RetriveProduct(paymentGateway),
            updateCustomer : new UpdateCustomer(paymentGateway),
            updateSubscription : new UpdateSubscription(paymentGateway),
            checkSubscriptionStatus: new CheckSubscriptionStatus(new StripeRepository()),
            listInvoices: new ListInvoices(paymentGateway),
            syncProducts: new StripeSyncService(paymentGateway),
            createCheckoutSession: new CreateCheckoutSession(paymentGateway),
        },
        user : {
            updateUser : new UpdateUserUseCase(userRepository),
            calculateFeatureUsage: new CalculateFeatureUsage(userRepository),
            updateUserByCustomerId: new UpdateUserByCustomerIdUseCase(userRepository),
            findUserById: new FindUserByIdUseCase(userRepository)
        },
        materia : {
            createMateria : new CreateMateria(materiaRepository),
            listMaterias : new ListMaterias(materiaRepository, userRepository),
            deleteMateria : new DeleteMateriaUseCase(materiaRepository),
            findMateria : new FindMateriaUseCase(materiaRepository)
        },
        file : {
            createFile : new CreateFile(fileRepository),
            listFiles : new ListFiles(fileRepository),
            deleteFile : new DeleteFileUseCase(fileRepository),
        },
        flashcard : {
            createFlashcard : new CreateFlashcardUseCase(flashcardRepository),
            findMany : new FindManyFlashcard(flashcardRepository),
            deleteFlashcard : new DeleteFlashcardUseCase(flashcardRepository),
            update : new UpdateFlashcardUseCase(flashcardRepository),
            findflashcardRevisao : new FindFlashcardsRevisao(flashcardRepository),
            createManyFlashcard : new CreateManyFlashcardUseCase(flashcardRepository),
        },
        questionario :{
            create : new CreateQuestionarioUseCase(questionarioRepository),
            list : new ListQuestionariosUseCase(questionarioRepository),
            getById : new GetQuestionarioUseCase(questionarioRepository),
            delete : new DeleteQuestionarioUseCase(questionarioRepository)
        },
        ai : {
            gerarFlashcardPDF : new CreateFlashcardByPDF(flashcardRepository,geminiRepository),
            gerarQuestionarioPDF : new CreateQuestionarioByPDFUseCase(questionarioRepository,geminiRepository),
            gerarPerguntasQuestionario : new CreatePerguntasQuestionarioUseCase(geminiRepository),
            gerarRespostaFlashcard : new CreateResponseFlashcard(geminiRepository),

        }
    }
}   